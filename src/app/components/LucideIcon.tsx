import { icons, LucideProps } from 'lucide-react'
import { IconName } from '../../types/types'

type Props = LucideProps & {
  name: IconName
}

const LucideIcon = ({ name, ...props }: Props) => {
  const IconComponent = icons[name]
  return <IconComponent {...props} />
}

export default LucideIcon
