function ConfirmDialog({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
    loading = false,
    onConfirm,
    onCancel
}) {
    return (
        <div className="confirm-dialog-overlay">
            <section
                className="confirm-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-message"
            >
                <h2 id="confirm-dialog-title">{title}</h2>

                <p id="confirm-dialog-message">{message}</p>

                <div className="confirm-dialog-actions">
                    <button
                        type="button"
                        className="confirm-dialog-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className={
                            danger
                                ? "confirm-dialog-submit danger"
                                : "confirm-dialog-submit"
                        }
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ConfirmDialog;