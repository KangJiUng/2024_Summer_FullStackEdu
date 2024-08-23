// 호출주소: http://localhost:3000/api/bot/simplebot
// 라우팅 주소는 /api 폴더 아래의 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨

// NextApiRequest 타입은 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체(=req)
// NextApiResponse 타입은 서버에서 웹브라우저로 전달하는 응답처리를 위한 HTTPResponse 객체(=res)
import type { NextApiRequest, NextApiResponse } from "next";

// 프론트엔드로 반환할 메시지 데이터타입 참조하기
import { IMessage, UserType } from "@/interfaces/message";

// OpenAI LLM 서비스 객체 참조하기
import { ChatOpenAI } from "@langchain/openai";

// 시스템, 휴면 메시지 객체 참조하기
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 프롬프트 템플릿 참조하기
import { ChatPromptTemplate } from "@langchain/core/prompts";

// LLM 응답 메시지 타입을 원하는 타입결과물로 파싱(변환)해주는 outputparser 참조하기
// StringOutputParser: AIMessage타입에서 콘텐츠의 속성값만 문자열로 변환해주는 파서
import { StringOutputParser } from "@langchain/core/output_parsers";

// 서버에서 웹브라우저로 반환하는 처리결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null | IMessage;
  msg: string;
};

// 해당 업무(hello)에 대한 C/R/U/D 처리를 위한 RESTful API 기능 구현 핸들러 함수
// 하나의 함수로 해당 업무의 모든 라우팅방식을 통합해서 기능을 제공하는 통합 라우팅 함수
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // API 호출 기본 결과값 설정
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: "Failed",
  };

  try {
    // 클라이언트에서 POST 방식으로 요청해오는 경우를 처리
    if (req.method == "POST") {
      // Step1: 프론트엔드에서 사용자 프롬프트 추출하기
      const prompt = req.body.message;

      // Step2: LLM 모델 생성하기
      const llm = new ChatOpenAI({
        model: "gpt-4o",
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Case1: OpenAI LLM 모델 기반 질의/응답처리하기 (초심플하게 LLM 연동)
      // const result = await llm.invoke(prompt);

      // Case2: 메시지 객체를 이용해서 LLM 연동하기 - PromptTemplate 1
      // SystemMessage 객체는 LLM의 역할이나 질문(힌트)에 관련된 주요 정보를 LLM에게 전달하는 객체
      // HumanMessage 객체는 사용자가 보낸 질문 메시지를 저장해서 LLM에게 전달가능한 객체
      // const messages = [
      //   new SystemMessage("당신은 세계적인 수준의 기술문서 작성자입니다."),
      //   new HumanMessage(prompt),
      // ];

      // const result = await llm.invoke(messages);

      // Case3: ChatPromptTemplate를 이용한 프롬프트 전달하기
      // 프롬프트 템플릿이란? LLM에게 전달할 수 있는 다양한 질문 템플릿을 제공함으로써 보다 효율적인 질문 형식을 만들어 LLM에게 제공하여 좋은 답변을 만들 방식 제공
      // // 의도: 좋은 질문이 좋은 답변을 만든다.
      // const PromptTemplate = ChatPromptTemplate.fromMessages([
      //   ["system", "당신은 뛰어난 실력을 가진 셰프입니다."],
      //   ["user", "{input}"],
      // ]);

      // // template.pipe(LLM모델) : chain 객체 반환(chain은 처리할 작업의 기본 단위)
      // // chain(처리할작업)을 여러 개 생성하고 chain을 연결하여 로직을 구현하는 방식이 'LangChain'이다!
      // const chain = PromptTemplate.pipe(llm);
      // const result = await chain.invoke({ input: prompt });

      // Case4: LLM 응답 결과 메시지는 기본 AIMessage 객체를 반환하지만
      // 해당 타입을 맞춤형 데이터 타입으로 변환해주는 OutputParser를 이용하여 원하는 포맷으로 변경 가능하다.
      const OutputParser = new StringOutputParser();
      const PromptTemplate = ChatPromptTemplate.fromMessages([
        ["system", "당신은 근대사 역사학자입니다."],
        ["user", "{input}"],
      ]);

      // template.pipe().pipe(): 두 개의 chain을 만들고 순차적으로 두 개를 체인 목록을 가진 결과체인을 반환
      // LLM 모델에 의해 결과메시지(AIMessage)를 받아 StringOutputParser를 통해 문자열로 반환한 결과 제공
      const chains = PromptTemplate.pipe(llm).pipe(OutputParser);

      // outputParser로 인해 result값은 실제 LLM의 응답메시지 문자열이 반환된다.(AIMessage.content)
      const resultMessage = await chains.invoke({ input: prompt });

      const resultMsg: IMessage = {
        user_type: UserType.BOT,
        message: resultMessage,
        send_date: new Date(),
      };

      // 메시지 처리결과 데이터
      // const resultMsg: IMessage = : result가 AIMessage의 타입인 경우(case1~3에 해당하는 경우만)
      //   user_type: UserType.BOT,
      //   message: result.content as string,
      //   send_date: Date.now().toString(),
      // };

      // Step3: API 호출 결과 설정
      apiResult.code = 200;
      apiResult.data = resultMsg;
      apiResult.msg = "OK";
    }
  } catch (err) {
    // Step2: API 호출 결과 설정
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);
}
