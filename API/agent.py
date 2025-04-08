import os
from typing import List, Dict, Any
from langchain.agents import Tool
from langchain.agents import AgentExecutor, create_react_agent
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import google.generativeai as genai
from googleapiclient.discovery import build
from langchain.tools import StructuredTool
# Load environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

def search_youtube_song(query: str) -> Dict[str, Any]:
    try:
        search_response = youtube.search().list(
            q=query,
            part='id,snippet',
            maxResults=1,
            type='video'
        ).execute()
        
        if not search_response['items']:
            return {"title": "Error", "code": "No results found"}
        
        video_id = search_response['items'][0]['id']['videoId']
        title = search_response['items'][0]['snippet']['title']
        
        return {"title": title, "code": video_id}
    except Exception as e:
        return {"title": "Error", "code": str(e)}

def search_youtube_playlist(songs: List[str]) -> List[Dict[str, Any]]:
    return [search_youtube_song(song) for song in songs]

def advanced_recommend_song(query: str) -> Dict[str, Any]:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"""Recommend ONE perfect song based on this query: "{query}".
        Consider mood, genre, artist preferences, and any other specifics mentioned.
        Return ONLY 'Song Name by Artist'."""
        
        response = model.generate_content(prompt)
        song_recommendation = response.text.strip()
        return search_youtube_song(song_recommendation)
    except Exception as e:
        return {"title": "Error", "code": str(e)}

def advanced_recommend_playlist(query: str, count: int = 5) -> List[Dict[str, Any]]:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"""Create a playlist of {count} songs based on this query: "{query}".
        Consider mood, genre, artist preferences, and any other specifics mentioned.
        Return each as 'Song Name by Artist' in a numbered list.
		IMPORTANT: Dont give any extra lines just name Song Name by Artist.
		"""
        
        response = model.generate_content(prompt)
        songs = [line.split('. ')[-1] for line in response.text.strip().split('\n') if line.strip()]
        return search_youtube_playlist(songs)
    except Exception as e:
        return [{"title": "Error", "code": str(e)}]
    

tools = [
    Tool(
        name="AdvancedRecommendSong",
        func=advanced_recommend_song,
        description="Recommends a song based on any music query including mood, genre, artist preferences."
    ),
    StructuredTool(
        name="AdvancedRecommendPlaylist",
        func=advanced_recommend_playlist,
        description="Recommends a playlist based on any music query including mood, genre, artist preferences.",
        args_schema={"query": str, "count": int}  # Explicitly defining count as an integer
    )
]

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)

prompt = PromptTemplate.from_template("""
You are a helpful music assistant that recommends songs based on user queries.
You can handle requests for specific moods, genres, artists, or any combination of these.
Caution: if question is out of music domain return a raw json object with DomainError and your message.
                                      
IMPORTANT: When you receive song data from the tools, return it EXACTLY as received. If there is single song put it inside array[] they reply. DO NOT add any formatting at all. Just return the raw data structure.
                                      
Output format: Only raw JSON with no markdown code blocks, backticks, or any other formatting.                                      

You have access to the following tools:
{tools}

Use the following format:
Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: return ONLY the song data exactly as provided by the tools, with no additional formatting or text

Begin!

Question: {input}
{agent_scratchpad}
""")

agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True,
    max_iterations=10, 
    max_execution_time=60
)

def process_user_query(query: str):
    try:
        result = agent_executor.invoke({"input": query})
        
        print(result)    
        return result
    except Exception as e:
        return [{"title": "Error", "code": str(e)}]
