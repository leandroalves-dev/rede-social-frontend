// eslint-disable-next-line react/prop-types
const Message = ({ msg, type }) => {
  return (
    <div className={`mb-3 border ${type === 'error' ? 'bg-red-300 border-red-400/20' : 'bg-green-300 border-green-400/20'}`}>
        <p className='text-neutral-700 text-sm p-2.5 text-center'>{msg}</p>
    </div>
  )
}

export default Message
