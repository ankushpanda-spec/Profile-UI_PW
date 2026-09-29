import React, {useEffect, useRef} from 'react';
import {
  Button,
  Typography,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Separator,
} from '@pw-tech/omni-ui';
import {useInView} from 'react-intersection-observer';
import s from '../styles/index.module.css';

interface BatchSelectionModalProps {
  isOpen: boolean;
  batches: {orderId: string; itemName: string}[];
  selectedBatches: string[];
  onBatchToggle: (orderId: string) => void;
  onSelectAll: () => void;
  onClose: () => void;
  onSave?: (selectedBatches: string[]) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isBatchesLoading?: boolean;
  fetchNextPage?: () => void;
}

const BatchSelectionModal: React.FC<BatchSelectionModalProps> = ({
  isOpen,
  batches,
  selectedBatches,
  onBatchToggle,
  onSelectAll,
  onClose,
  onSave = () => {},
  hasNextPage = false,
  isFetchingNextPage = false,
  isBatchesLoading = false,
  fetchNextPage = () => {},
}) => {
  const {ref: anchorRef, inView} = useInView({
    threshold: 0.5,
  });

  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  // Infinite scroll trigger
  useEffect(() => {
    if (
      inView &&
      hasNextPageRef.current &&
      !isFetchingNextPageRef.current &&
      fetchNextPage
    ) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const allSelected =
    batches.length > 0 && selectedBatches.length === batches.length;

  const handleSelectAll = () => {
    onSelectAll();
  };

  return (
    <Modal isOpen={isOpen} size="small" onClose={onClose}>
      <ModalHeader>
        <Typography color="text-heading" variant="heading4" weight="semi-bold">
          Select Batch(es)
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <div className={s.batchModalBody}>
          <Typography variant="regular" color="text-body-1">
            Select batch(es) of which you want to change the registered mobile
            no.
          </Typography>
          <div className={s.batchList}>
            {/* Select All */}
            <label className={s.batchListItem} htmlFor="select-all-checkbox">
              <span className={s.batchCheckboxWrap}>
                <input
                  id="select-all-checkbox"
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className={s.batchCheckboxInput}
                />
                <span
                  className={`${s.batchCheckbox} ${allSelected ? s.batchCheckboxChecked : ''}`}
                />
              </span>
              <span className={s.batchItemText}>Select all batches</span>
              <span className={s.batchDivider} />
            </label>
            {isBatchesLoading && batches.length === 0 && (
              <div className={s.batchListItem}>
                <Typography variant="regular" color="text-body-2">
                  Loading batches...
                </Typography>
              </div>
            )}
            {!isBatchesLoading && batches.length === 0 && (
              <div className={s.batchListItem}>
                <Typography variant="regular" color="text-body-2">
                  No batches found
                </Typography>
              </div>
            )}
            {batches.length > 0 && (
              <div className={s.batchScrollArea}>
                {batches.map(batch => {
                  const checked = selectedBatches.includes(batch.orderId);
                  const checkboxId = `batch-${batch.orderId}`;
                  return (
                    <label
                      key={batch.orderId}
                      className={s.batchListItem}
                      htmlFor={checkboxId}
                    >
                      <span className={s.batchCheckboxWrap}>
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={checked}
                          onChange={() => onBatchToggle(batch.orderId)}
                          className={s.batchCheckboxInput}
                        />
                        <span
                          className={`${s.batchCheckbox} ${checked ? s.batchCheckboxChecked : ''}`}
                        />
                      </span>
                      <span className={s.batchItemText}>{batch.itemName}</span>
                      <span className={s.batchDivider} />
                    </label>
                  );
                })}
                <div ref={anchorRef} className={s.batchScrollAnchor}>
                  {isFetchingNextPage && (
                    <Typography variant="small" color="text-body-2">
                      Loading more...
                    </Typography>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          fullWidth
          size="medium"
          variant="dark"
          onClick={() => {
            if (onSave) onSave(selectedBatches);
          }}
          disabled={selectedBatches.length === 0}
        >
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BatchSelectionModal;
