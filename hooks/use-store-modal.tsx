import React from 'react';
import {create} from 'zustand';

interface IUseStoreModal {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

export const UseStoreModal = create<IUseStoreModal>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
