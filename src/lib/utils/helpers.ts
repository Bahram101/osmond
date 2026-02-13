export const validEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const generateEAN13 = (): string => {
  const base = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10)
  );

  const sum = base.reduce((acc, digit, index) => {
    return acc + digit * (index % 2 === 0 ? 1 : 3);
  }, 0);

  const checksum = (10 - (sum % 10)) % 10;

  return [...base, checksum].join("");
};

export const formatDateTime = (iso: string) => {
  const date = new Date(iso);

  const datePart = date.toLocaleDateString("ru-RU", {
    timeZone: "Asia/Almaty",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("ru-RU", {
    timeZone: "Asia/Almaty",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} ${timePart}`;
};

export const formatCurrency = (value: number, symbol: string = "₸"): string => {
  if (value == null || isNaN(value)) return `0 ${symbol}`;

  return value.toLocaleString("ru-RU") + ` ${symbol}`;
};

export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play().catch(() => {});
};
