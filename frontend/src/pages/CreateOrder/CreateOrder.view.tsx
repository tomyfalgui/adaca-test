import React, { useMemo, useReducer } from 'react'
import './CreateOrder.css'
import RadioInput from '../../components/RadioInput'
import { CreateOrderProps } from './CreateOrder.props'

const CreateOrderView = (props: CreateOrderProps) => {
  const { items, rules } = props

  type SelectedItems = Record<number, string>
  const [selectedItems, updateSelectedItems] = useReducer(
    (state: SelectedItems, newState: SelectedItems) => {
      return { ...state, ...newState }
    },
    {
      0: '',
      1: '',
      2: '',
    } as SelectedItems
  )

  const isSelected = (id: string, groupIndex: number) => {
    return id === selectedItems[groupIndex]
  }

  const blacklist: number[] = useMemo(() => {
    const { 0: a, 1: b, 2: c } = selectedItems

    return [a, b, c]
      .map((el: string) => {
        return +el in rules ? rules[+el] : []
      })
      .reduce((acc, curr) => {
        return [...acc, ...curr]
      }, [])
  }, [rules, selectedItems])

  const isDisabled = (id: string) => {
    return blacklist.includes(+id)
  }

  const handleSelection = (value: string, groupIndex: number) => {
    updateSelectedItems({
      [groupIndex]: value,
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(selectedItems)
  }

  if (items.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <div className="createOrder">
      <form onSubmit={handleSubmit}>
        {items.map((group, groupIndex) => {
          return (
            <div key={groupIndex}>
              {group.map(item => {
                return (
                  <RadioInput
                    key={item.id}
                    label={item.value}
                    value={item.id}
                    checked={isSelected(item.id, groupIndex)}
                    disabled={isDisabled(item.id)}
                    onSelect={value => handleSelection(value, groupIndex)}
                  />
                )
              })}
              <br />
            </div>
          )
        })}
        <input type="submit" />
      </form>
    </div>
  )
}

export default CreateOrderView
