import { useEffect, useState } from 'react'
import { getMenuItems, GetMenuItemsResponse } from '../../services/menu'
import {
  CreateOrderPrivateProps,
  CreateOrderPublicProps,
} from './CreateOrder.props'
import CreateOrderView from './CreateOrder.view'

const CreateOrder = (props: CreateOrderPublicProps) => {
  const [menuData, setMenuData] = useState<CreateOrderPrivateProps>({
    items: [],
    rules: {},
  })
  useEffect(() => {
    const fetchData = async () => {
      const data: GetMenuItemsResponse = await getMenuItems()
      setMenuData(data)
    }

    fetchData()
  }, [])

  return <CreateOrderView {...menuData} />
}

export default CreateOrder
