import { lazy, type ComponentType } from 'react';

export function lazyImport<T extends ComponentType<any>>(
	factory: () => Promise<Record<string, T>>,
	name: string
): React.LazyExoticComponent<T> {
	return lazy(() => factory().then(module => ({ default: module[name] })));
}
