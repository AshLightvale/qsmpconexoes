// Use type safe message keys with `next-intl`
type Messages = typeof import("../messages/pt.json");
declare interface IntlMessages extends Messages {}
