import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AICredentials, EmbedderCredential } from '@core/datatypes';
import { OPENAI_EMBEDDER_MODELS } from '@shared/constants';
import { AIModels } from '@shared/datatypes';
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
  };
  embedderBrands = [{ name: 'OpenAI', value: 'openai' }];
  emebedderModels: AIModels = OPENAI_EMBEDDER_MODELS;

  get embedderCredential() {
    return this.AICredentialsViewModel.embedderCredential as EmbedderCredential;
  }

  updateEmbedderBrand(brandId: string) {
    this.embedderCredential.brandId = brandId;
    if (brandId === 'openai') {
      this.emebedderModels = OPENAI_EMBEDDER_MODELS;
    }
  }
}
