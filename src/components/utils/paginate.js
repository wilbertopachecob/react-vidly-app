import _ from "lodash";

export default function paginate(items, pageSize, currentIndex) {
  const startIndex = (currentIndex - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
