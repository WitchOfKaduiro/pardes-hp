export default function NumberedList({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  return (
    <ul className="pardes-numbered-list">
      {items.map((item, index) => (
        <li key={item.title} className="pardes-numbered-list__item">
          <span className="pardes-numbered-list__index font-en" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}/
          </span>
          <div>
            <p className="pardes-numbered-list__title font-shippori">
              {item.title}
            </p>
            <p className="pardes-numbered-list__body font-kozuka">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
