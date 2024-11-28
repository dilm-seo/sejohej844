export interface OpenAISettings {
  apiKey: string;
  model: string;
  temperature: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  prompt: string;
  type: 'analysis' | 'sentiment' | 'opportunity' | 'visualization';
}

export interface AppSettings {
  openai: OpenAISettings;
  prompts: PromptTemplate[];
}