export function removeEmptyParams(params: Record<string, unknown>) {
  const notEmptyParams: Record<string, unknown> = {};

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value) {
      notEmptyParams[key] = value;
    }
  });

  return notEmptyParams;
}
