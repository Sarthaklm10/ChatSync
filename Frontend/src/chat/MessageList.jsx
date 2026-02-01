import React, { useEffect, useMemo, useRef } from "react";
import MessageBubble from "./MessageBubble";
import useMessages from "../context/useMessages.js";
import Loading from "../components/Loading.jsx";
import useSocketMessages from "../context/useSocketMessages.js";

function MessageList() {
  const { loading, messages } = useMessages();
  useSocketMessages(); // listing incoming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  // Helper: format day label
  const getDayLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Group messages by day (preserve order)
  const messagesWithDividers = useMemo(() => {
    if (!messages || messages.length === 0) return [];
    const result = [];
    let lastDayKey = "";
    for (const msg of messages) {
      const dayKey = new Date(msg.createdAt).toDateString();
      if (dayKey !== lastDayKey) {
        result.push({
          __divider: true,
          key: dayKey,
          label: getDayLabel(msg.createdAt),
        });
        lastDayKey = dayKey;
      }
      result.push(msg);
    }
    return result;
  }, [messages]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-1 md:px-4 py-2 space-y-1 md:space-y-2">
      {loading ? (
        <Loading />
      ) : (
        messagesWithDividers.length > 0 &&
        messagesWithDividers.map((item, index) => {
          if (item.__divider) {
            return (
              <DayDivider key={`div-${item.key}-${index}`} label={item.label} />
            );
          }
          const isLast = index === messagesWithDividers.length - 1;
          return (
            <div key={item._id} ref={isLast ? lastMsgRef : null}>
              <MessageBubble message={item} />
            </div>
          );
        })
      )}

      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-base-content/60 text-base md:text-lg">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

function DayDivider({ label }) {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="flex-1 h-px bg-base-300" />
      <span className="mx-3 text-xs md:text-sm text-base-content/60 bg-base-100 px-2 py-0.5 rounded-full border border-base-300">
        {label}
      </span>
      <div className="flex-1 h-px bg-base-300" />
    </div>
  );
}

export default MessageList;
