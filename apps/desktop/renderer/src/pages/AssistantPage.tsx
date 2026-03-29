import { useState } from "react";
import { Card, SectionTitle, TextInput } from "@/components/ui";
import { demoSeed } from "@/mocks/demoData";
import { demoApi } from "@/services/mock/demoApi";
import type { AssistantMessage } from "@/types/demo";

export const AssistantPage = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>(demoSeed.assistantInitialMessages);
  const [suggestions, setSuggestions] = useState(["Portfolio overview", "Risk summary", "This week"]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = async (rawInput = input) => {
    const value = rawInput.trim();
    if (!value) {
      return;
    }
    setTyping(true);
    setInput("");
    const result = await demoApi.sendAssistantMessage(value, messages);
    setMessages((current) => [...current, result.user, result.assistant]);
    setSuggestions(result.suggestions);
    setTyping(false);
  };

  return (
    <div className="page-stack">
      <Card className="assistant-shell">
        <SectionTitle title="Demo assistant" kicker="Hardcoded mock responses" />
        <div className="assistant-thread">
          {messages.map((message) => (
            <div key={message.id} className={`chat-bubble ${message.role}`}>
              <span>{message.role === "assistant" ? "Assistant" : "You"}</span>
              <p>{message.content}</p>
            </div>
          ))}
          {typing ? <div className="chat-bubble assistant typing"><span>Assistant</span><p>Typing response...</p></div> : null}
        </div>
        <div className="chip-row">
          {suggestions.map((suggestion) => (
            <button key={suggestion} className="chip-link" onClick={() => void send(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
        <div className="assistant-input">
          <TextInput value={input} onChange={setInput} placeholder="Ask for a portfolio overview, risk summary, or weekly recap" />
          <button className="primary-button" onClick={() => void send()}>Send</button>
        </div>
      </Card>
    </div>
  );
};
