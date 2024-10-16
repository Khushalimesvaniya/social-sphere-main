import { create } from 'zustand';

interface GenerateModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useGenerateModal = create<GenerateModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useGenerateModal;
