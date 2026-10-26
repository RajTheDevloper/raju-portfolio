import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Archive,
    Check,
    CheckCheck,
    Mail,
    MailOpen,
    RefreshCw,
    Search,
    Trash2,
    X,
} from "lucide-react";

import {
    archiveContactMessage,
    deleteContactMessage,
    getContactMessages,
    getUnreadMessageCount,
    markContactMessageAsRead,
    markContactMessageAsUnread,
} from "../../services/admin/contactMessageService";

const FILTERS = [
    { label: "All messages", value: "ALL" },
    { label: "Unread", value: "UNREAD" },
    { label: "Read", value: "READ" },
    { label: "Archived", value: "ARCHIVED" },
];

const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    (typeof error?.response?.data === "string"
        ? error.response.data
        : null) ||
    error?.message ||
    "Something went wrong. Please try again.";

const formatDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const getInitials = (name = "") =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "?";

const AdminMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadUnreadCount = useCallback(async () => {
        try {
            const count = await getUnreadMessageCount();
            setUnreadCount(Number(count) || 0);
        } catch {
            // Keep the inbox usable even if the count endpoint fails.
        }
    }, []);

    const loadMessages = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getContactMessages(filter);
            const items = Array.isArray(data) ? data : [];
            setMessages(items);

            setSelectedMessage((current) => {
                if (!current) return null;
                return items.find((item) => item.id === current.id) || null;
            });
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [filter]);

    const refreshInbox = useCallback(async () => {
        await Promise.all([loadMessages(), loadUnreadCount()]);
    }, [loadMessages, loadUnreadCount]);

    useEffect(() => {
        refreshInbox();
    }, [refreshInbox]);

    const filteredMessages = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) return messages;

        return messages.filter((message) =>
            [
                message.name,
                message.email,
                message.subject,
                message.message,
            ]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(term))
        );
    }, [messages, search]);

    const handleAction = async (message, action) => {
        setBusyId(message.id);
        setError("");
        setSuccess("");

        try {
            let updatedMessage;

            if (action === "read") {
                updatedMessage = await markContactMessageAsRead(message.id);
                setSuccess("Message marked as read.");
            } else if (action === "unread") {
                updatedMessage = await markContactMessageAsUnread(message.id);
                setSuccess("Message marked as unread.");
            } else if (action === "archive") {
                updatedMessage = await archiveContactMessage(message.id);
                setSuccess("Message archived.");
            }

            if (updatedMessage) {
                setMessages((current) =>
                    current.map((item) =>
                        item.id === message.id ? updatedMessage : item
                    )
                );

                setSelectedMessage((current) =>
                    current?.id === message.id ? updatedMessage : current
                );
            }

            await refreshInbox();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setBusyId(null);
        }
    };

    const handleDelete = async (message) => {
        const confirmed = window.confirm(
            `Permanently delete the message from ${message.name || "this sender"}?`
        );

        if (!confirmed) return;

        setBusyId(message.id);
        setError("");
        setSuccess("");

        try {
            await deleteContactMessage(message.id);

            setMessages((current) =>
                current.filter((item) => item.id !== message.id)
            );

            setSelectedMessage((current) =>
                current?.id === message.id ? null : current
            );

            setSuccess("Message deleted.");
            await loadUnreadCount();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setBusyId(null);
        }
    };

    const openMessage = async (message) => {
        setSelectedMessage(message);

        if (message.status === "UNREAD") {
            await handleAction(message, "read");
        }
    };

    const unreadInCurrentList = messages.filter(
        (message) => message.status === "UNREAD"
    ).length;

    return (
        <section className="admin-messages-page">
            <header className="messages-page-header">
                <div>
                    <p className="messages-eyebrow">COMMUNICATION</p>
                    <h1>Messages</h1>
                    <p className="messages-page-description">
                        Read and manage messages submitted through your portfolio contact form.
                    </p>
                </div>

                <button
                    type="button"
                    className="messages-button messages-button-secondary"
                    onClick={refreshInbox}
                    disabled={loading}
                >
                    <RefreshCw size={16} className={loading ? "messages-spinning" : ""} />
                    Refresh
                </button>
            </header>

            {error && (
                <div className="messages-alert messages-alert-error" role="alert">
                    <span>{error}</span>
                    <button type="button" onClick={() => setError("")} aria-label="Dismiss error">
                        <X size={16} />
                    </button>
                </div>
            )}

            {success && (
                <div className="messages-alert messages-alert-success" role="status">
                    <span>{success}</span>
                    <button type="button" onClick={() => setSuccess("")} aria-label="Dismiss message">
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="messages-stats-grid">
                <article className="messages-stat-card">
                    <div className="messages-stat-icon messages-stat-icon-purple">
                        <Mail size={20} />
                    </div>
                    <div>
                        <span>Total in current view</span>
                        <strong>{messages.length}</strong>
                    </div>
                </article>

                <article className="messages-stat-card">
                    <div className="messages-stat-icon messages-stat-icon-orange">
                        <MailOpen size={20} />
                    </div>
                    <div>
                        <span>Unread messages</span>
                        <strong>{unreadCount}</strong>
                    </div>
                </article>

                <article className="messages-stat-card">
                    <div className="messages-stat-icon messages-stat-icon-green">
                        <CheckCheck size={20} />
                    </div>
                    <div>
                        <span>Read in current view</span>
                        <strong>
                            {messages.filter((message) => message.status === "READ").length}
                        </strong>
                    </div>
                </article>
            </div>

            <div className="messages-workspace">
                <aside className="messages-inbox-panel">
                    <div className="messages-inbox-heading">
                        <div>
                            <h2>Inbox</h2>
                            <span>{messages.length} messages</span>
                        </div>
                        <Mail size={20} />
                    </div>

                    <div className="messages-search">
                        <Search size={17} />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search messages..."
                            aria-label="Search messages"
                        />
                    </div>

                    <nav className="messages-filter-list" aria-label="Message status filters">
                        {FILTERS.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                className={`messages-filter-button ${
                                    filter === item.value ? "is-selected" : ""
                                }`}
                                onClick={() => {
                                    setFilter(item.value);
                                    setSelectedMessage(null);
                                }}
                            >
                                <span>{item.label}</span>
                                {item.value === "UNREAD" && unreadCount > 0 && (
                                    <span className="messages-filter-count">{unreadCount}</span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="messages-list">
                        {loading ? (
                            <div className="messages-list-state">
                                <div className="messages-spinner" />
                                <p>Loading messages...</p>
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="messages-list-state">
                                <Mail size={28} />
                                <p>No messages found.</p>
                                <span>Try another filter or search term.</span>
                            </div>
                        ) : (
                            filteredMessages.map((message) => (
                                <button
                                    type="button"
                                    key={message.id}
                                    className={`messages-list-item ${
                                        selectedMessage?.id === message.id ? "is-active" : ""
                                    } ${
                                        message.status === "UNREAD" ? "is-unread" : ""
                                    }`}
                                    onClick={() => openMessage(message)}
                                >
                                    <span className="messages-avatar">
                                        {getInitials(message.name)}
                                    </span>

                                    <span className="messages-list-content">
                                        <span className="messages-list-topline">
                                            <strong>{message.name || "Unknown sender"}</strong>
                                            {message.status === "UNREAD" && (
                                                <span className="messages-unread-dot" />
                                            )}
                                        </span>
                                        <span className="messages-list-subject">
                                            {message.subject || "(No subject)"}
                                        </span>
                                        <span className="messages-list-preview">
                                            {message.message}
                                        </span>
                                        <span className="messages-list-date">
                                            {formatDate(message.createdAt)}
                                        </span>
                                    </span>
                                </button>
                            ))
                        )}
                    </div>
                </aside>

                <main className="messages-detail-panel">
                    {!selectedMessage ? (
                        <div className="messages-detail-empty">
                            <div className="messages-detail-empty-icon">
                                <MailOpen size={30} />
                            </div>
                            <h2>Select a message</h2>
                            <p>Choose a message from the inbox to read its full contents.</p>
                        </div>
                    ) : (
                        <article className="messages-detail">
                            <div className="messages-detail-toolbar">
                                <span
                                    className={`messages-status-badge ${
                                        selectedMessage.status === "UNREAD"
                                            ? "status-unread"
                                            : selectedMessage.status === "ARCHIVED"
                                                ? "status-archived"
                                                : "status-read"
                                    }`}
                                >
                                    {selectedMessage.status || "UNKNOWN"}
                                </span>

                                <div className="messages-detail-actions">
                                    {selectedMessage.status === "UNREAD" ? (
                                        <button
                                            type="button"
                                            className="messages-icon-button"
                                            title="Mark as read"
                                            aria-label="Mark as read"
                                            disabled={busyId === selectedMessage.id}
                                            onClick={() => handleAction(selectedMessage, "read")}
                                        >
                                            <Check size={17} />
                                        </button>
                                    ) : selectedMessage.status === "READ" ? (
                                        <button
                                            type="button"
                                            className="messages-icon-button"
                                            title="Mark as unread"
                                            aria-label="Mark as unread"
                                            disabled={busyId === selectedMessage.id}
                                            onClick={() => handleAction(selectedMessage, "unread")}
                                        >
                                            <Mail size={17} />
                                        </button>
                                    ) : null}

                                    {selectedMessage.status !== "ARCHIVED" && (
                                        <button
                                            type="button"
                                            className="messages-icon-button"
                                            title="Archive message"
                                            aria-label="Archive message"
                                            disabled={busyId === selectedMessage.id}
                                            onClick={() => handleAction(selectedMessage, "archive")}
                                        >
                                            <Archive size={17} />
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="messages-icon-button messages-icon-danger"
                                        title="Delete message"
                                        aria-label="Delete message"
                                        disabled={busyId === selectedMessage.id}
                                        onClick={() => handleDelete(selectedMessage)}
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>

                            <h2 className="messages-detail-subject">
                                {selectedMessage.subject || "(No subject)"}
                            </h2>

                            <div className="messages-sender">
                                <span className="messages-avatar messages-avatar-large">
                                    {getInitials(selectedMessage.name)}
                                </span>
                                <div className="messages-sender-info">
                                    <strong>{selectedMessage.name || "Unknown sender"}</strong>
                                    <a href={`mailto:${selectedMessage.email}`}>
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <time>{formatDate(selectedMessage.createdAt)}</time>
                            </div>

                            <div className="messages-body">
                                {selectedMessage.message}
                            </div>

                            <div className="messages-detail-footer">
                                <span>
                                    Message ID: #{selectedMessage.id}
                                </span>
                                {selectedMessage.updatedAt && (
                                    <span>
                                        Updated: {formatDate(selectedMessage.updatedAt)}
                                    </span>
                                )}
                                <a
                                    className="messages-reply-link"
                                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                                        `Re: ${selectedMessage.subject || "Your message"}`
                                    )}`}
                                >
                                    Reply by email ↗
                                </a>
                            </div>
                        </article>
                    )}
                </main>
            </div>

            <p className="messages-footnote">
                {unreadInCurrentList} unread message{unreadInCurrentList === 1 ? "" : "s"} in the current list.
            </p>
        </section>
    );
};

export default AdminMessagesPage;