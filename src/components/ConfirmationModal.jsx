import "./ConfirmationModal.css";

export function ConfirmationModal({
    message,
    confirmLabel,
    onCancel,
    onConfirm,
}) {
    return (
        <div className="confirmation-modal-backdrop">
            <div className="confirmation-modal">
                <p>{message}</p>
                <div className="confirmation-modal-actions">
                    <button onClick={onCancel} type="button">
                        Cancel
                    </button>
                    <button onClick={onConfirm} type="button">
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
