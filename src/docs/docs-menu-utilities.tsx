import {
  HeartbeatIcon,
  MapTrifoldIcon,
  RocketLaunchIcon,
  type MenuUtilityItem,
} from '@chghealthcare/unified-design-system'
import { LATEST_READOUT_ROUTE } from './readout/readout-months'
import { DOCS_UTILITY_NAV_ROUTES } from './versions/navigation'

export function buildDocsMenuUtilities(navigate: (path: string) => void): MenuUtilityItem[] {
  return [
    {
      id: 'readout',
      label: 'Readout',
      icon: HeartbeatIcon,
      onSelect: () => navigate(LATEST_READOUT_ROUTE),
    },
    {
      id: 'releases',
      label: 'Releases',
      icon: RocketLaunchIcon,
      onSelect: () => navigate(DOCS_UTILITY_NAV_ROUTES.releases),
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: MapTrifoldIcon,
      onSelect: () => navigate(DOCS_UTILITY_NAV_ROUTES.roadmap),
    },
  ]
}
