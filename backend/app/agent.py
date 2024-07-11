from langchain_openai import ChatOpenAI
from config import settings
from langchain_core.prompts import ChatPromptTemplate
from app.prompt import main_agent_prompt
from app.stock_tool import stock_price_tool
from langchain_core.prompts import ChatPromptTemplate
from langchain.agents import (
    AgentExecutor,
    create_tool_calling_agent,
)


def agent_run(question: str):

    llm = ChatOpenAI(
        verbose=True,
        model_name=settings.LLM_MODEL_NAME,
        temperature=0,
        openai_api_key=settings.OPENAI_API_KEY,
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                main_agent_prompt,
            ),
            ("placeholder", "{chat_history}"),
            ("human", "{input}"),
            ("placeholder", "{agent_scratchpad}"),
        ]
    )

    try:
        tools = [stock_price_tool()]

        agent = create_tool_calling_agent(llm, tools, prompt)

        agent_executor = AgentExecutor(
            agent=agent, tools=tools, verbose=False, return_intermediate_steps=True
        )
        response = agent_executor.invoke({"input": question})
        answer = response["output"]
        
        # getting tool's output for display the chart in frontend.
        tool_outputs = response["intermediate_steps"]
        if len(tool_outputs) > 0:
            final_tool_output = tool_outputs[-1]
            analyze_data = final_tool_output[-1]
        else:
            analyze_data = None

        return answer, analyze_data
    except Exception as e:
        return None, None
