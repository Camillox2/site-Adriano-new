import React from 'react';

/**
 * Igual ao React.lazy, mas permite carregar o módulo antes do primeiro render
 * (Component.preload()). Depois de carregado, o componente é renderizado de
 * forma síncrona, sem suspender — necessário para hidratar o HTML
 * pré-renderizado sem divergências.
 */
export default function lazyWithPreload(factory) {
  let Loaded = null;
  let promise = null;
  const load = () => {
    if (!promise) {
      promise = factory().then((module) => {
        Loaded = module.default;
        return module;
      });
    }
    return promise;
  };
  const Lazy = React.lazy(load);
  const Component = (props) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Component.preload = load;
  return Component;
}
