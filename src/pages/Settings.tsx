import React from 'react';
import { OpenAISettings } from '../components/settings/OpenAISettings';
import { PromptSettings } from '../components/settings/PromptSettings';
import { PromptGenerator } from '../components/settings/PromptGenerator';

export function Settings() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h1>
      
      <div className="space-y-8">
        <OpenAISettings />
        <PromptSettings />
        <PromptGenerator />
      </div>
    </div>
  );
}