'use client';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface IModalProps {
    title?: string,
    description?: string,
    isOpen: boolean,
    onClose: () => void
    children?: React.ReactNode
}

export default function Modal({ description, isOpen, onClose, title, children }: IModalProps) {

  const onChange = (open: boolean) => {
    if(!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>

      </DialogContent>
    </Dialog>
  );
}
