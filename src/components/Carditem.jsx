import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext)

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Remove
      </button>
    </div>
  )
}
