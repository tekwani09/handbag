import BaseModal from './BaseModal'

interface CountryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CountryModal({ isOpen, onClose }: CountryModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex-1"></div>
    </BaseModal>
  )
}
