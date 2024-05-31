import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AICredentials,
  EmbedderCredential,
  LLMCredential,
} from '@core/datatypes';
import { OPENAI_EMBEDDER_MODELS, OPENAI_LLM_MODELS } from '@shared/constants';
import { EmbedderModels, LLMModels } from '@shared/datatypes';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-ai-credentials-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './ai-credentials-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiCredentialsDialogComponent {
  AICredentialsViewModel: AICredentials = {
    embedderCredential: {
      apiKey: '',
      brandId: 'openai',
      modelName: 'text-embedding-ada-002',
    },
    LLMCredential: {
      apiKey: '',
      brandId: 'openai',
      modelName: 'GPT-4o',
    },
  };
  embedderBrands = [{ name: 'OpenAI', value: 'openai' }];
  emebedderModels: EmbedderModels = OPENAI_EMBEDDER_MODELS;
  LLMBrands = [{ name: 'OpenAI', value: 'openai' }];
  LLModels: LLMModels = OPENAI_LLM_MODELS;

  get embedderCredential() {
    return this.AICredentialsViewModel.embedderCredential as EmbedderCredential;
  }

  get LLMCredential() {
    return this.AICredentialsViewModel.LLMCredential as LLMCredential;
  }

  updateEmbedderBrand(brandId: string) {
    this.embedderCredential.brandId = brandId;
    if (brandId === 'openai') {
      this.emebedderModels = OPENAI_EMBEDDER_MODELS;
    }
  }

  updateLLMBrand(brandId: string) {
    this.LLMCredential.brandId = brandId;
    if (brandId === 'openai') {
      this.LLModels = OPENAI_LLM_MODELS;
    }
  }
}
