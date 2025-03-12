import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getHeight(): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('StatusBarHeight'); 