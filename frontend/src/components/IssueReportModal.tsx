import { useState } from 'react'

interface OrderItem {
  id: string
  product: {
    name: string
    images: string[]
  }
  quantity: number
}

interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
}

interface IssueReportModalProps {
  order: Order
  topicId: string
  onClose: () => void
  onSubmit: (data: any) => void
}

const ISSUE_OPTIONS: { [key: string]: string[] } = {
  wrong_bag: [
    'I received a different bag',
    'I received the wrong colour',
    'An item is missing from the parcel',
    'The parcel arrived empty or opened',
    'I received an item I did not order',
    'Packaging was missing — dust bag or card'
  ],
  wrong_order: [
    'I received a different bag',
    'I received the wrong colour',
    'An item is missing from the parcel',
    'The parcel arrived empty or opened',
    'I received an item I did not order'
  ],
  delivery: [
    'Parcel shows as delivered but not received',
    'Parcel is delayed',
    'Parcel was damaged in transit',
    'Cannot locate delivery address'
  ],
  payment: [
    'I was charged twice',
    'I need a refund',
    'I need an invoice copy',
    'I was charged import duties unexpectedly'
  ],
  returns: [
    'I want to start a return',
    'I want to exchange for a different colour',
    'How long do I have to return?',
    'Where do I send the return?'
  ]
}

const TOPIC_NAMES: { [key: string]: string } = {
  wrong_bag: 'Something is wrong with my bag',
  wrong_order: 'Something is wrong with my order',
  delivery: 'Delivery and address',
  payment: 'Payment, invoice or duties',
  returns: 'Returns and exchanges'
}

export default function IssueReportModal({
  order,
  topicId,
  onClose,
  onSubmit
}: IssueReportModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    order.items.length === 1 ? [order.items[0].id] : []
  )
  const [selectedIssue, setSelectedIssue] = useState('')
  const [description, setDescription] = useState('')
  const [replyEmail, setReplyEmail] = useState('')
  const [useAltEmail, setUseAltEmail] = useState(false)
  const [altEmail, setAltEmail] = useState('')
  const [showIssueDropdown, setShowIssueDropdown] = useState(false)

  const handleItemToggle = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }

  const handleSubmit = () => {
    const data = {
      orderId: order.id,
      topic: topicId,
      selectedItems,
      issue: selectedIssue,
      description,
      replyEmail: useAltEmail ? altEmail : replyEmail
    }
    onSubmit(data)
  }

  const issueOptions = ISSUE_OPTIONS[topicId] || []
  const topicName = TOPIC_NAMES[topicId] || ''

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl p-12 md:p-16 relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-gray-500 hover:text-gray-700 leading-none"
        >
          ×
        </button>

        <h2 className="text-3xl font-light mb-3" style={{fontFamily: 'Cormorant Garamond'}}>
          {topicName}
        </h2>
        
        <p className="text-xs text-gray-600 mb-8">
          Order #{order.orderNumber} · {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {/* Item selection (only if order has multiple items) */}
        {order.items.length > 1 && (
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-widest text-gray-700 mb-4">
              Which item is this about?
            </label>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemToggle(item.id)}
                  className="flex items-center gap-4 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="w-4 h-4 border border-gray-400 rounded flex-shrink-0 flex items-center justify-center">
                    {selectedItems.includes(item.id) && (
                      <div className="w-2 h-2 bg-black rounded-sm"></div>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-gray-200 flex-shrink-0 rounded overflow-hidden">
                    {item.product.images?.[0] ? (
                      <img 
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-light text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-600">Quantity {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            {order.items.length > 1 && (
              <p className="text-xs text-gray-600 mt-3">Select all that apply.</p>
            )}
          </div>
        )}

        {/* Issue dropdown */}
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-widest text-gray-700 mb-3">
            What is wrong?
          </label>
          <div className="relative">
            <button
              onClick={() => setShowIssueDropdown(!showIssueDropdown)}
              className="w-full text-left py-3 px-0 border-b-2 border-gray-300 hover:border-black transition-colors text-sm flex items-center justify-between"
            >
              <span className={selectedIssue ? 'text-gray-900' : 'text-gray-500'}>
                {selectedIssue || 'Please choose'}
              </span>
              <svg className="w-3 h-2" viewBox="0 0 12 8" fill="none">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </button>

            {showIssueDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
                {issueOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedIssue(option)
                      setShowIssueDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                      selectedIssue === option ? 'bg-gray-50 font-medium' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-widest text-gray-700 mb-3">
            Tell us a little more
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="The more you can describe, the faster we can put it right."
            className="w-full p-4 border border-gray-300 rounded text-sm focus:border-black focus:outline-none resize-none min-h-24"
          />
          <p className="text-xs text-gray-600 mt-2">The more detail you provide, the faster we can help.</p>
        </div>

        {/* Email */}
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-widest text-gray-700 mb-3">
            Reply to
          </label>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-sm text-gray-700">[email@example.com]</span>
            <button 
              onClick={() => setUseAltEmail(!useAltEmail)}
              className="text-xs text-gray-600 border-b border-gray-400 hover:border-black transition-colors"
            >
              Use a different email
            </button>
          </div>

          {useAltEmail && (
            <div className="mb-4">
              <input
                type="email"
                value={altEmail}
                onChange={(e) => setAltEmail(e.target.value)}
                placeholder="Another email address"
                className="w-full py-2 px-0 border-b-2 border-gray-300 hover:border-black focus:border-black focus:outline-none text-sm"
              />
              <p className="text-xs text-gray-600 mt-2">We will reply to this address instead.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedIssue || !description.trim()}
            className="w-full bg-black text-white py-4 px-6 text-xs uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send Report
          </button>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-600 hover:text-black py-3 transition-colors"
          >
            Cancel
          </button>
          <p className="text-xs text-gray-600 text-center">
            We reply within one to two business days.
          </p>
        </div>
      </div>
    </div>
  )
}
