import { ComponentMeta, Story } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { Button } from "../Button"
import { TextInput } from "../TextInput"
import { Sidebar } from "./Sidebar"
import styles from "./Sidebar.module.css"
/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>

export const Basic: Story<ComponentProps<typeof Sidebar>> = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setSidebarExpanded(true)}>
        Open basic sidebar
      </Button>
      <Sidebar
        open={sidebarExpanded}
        hideOverlay={false}
        position="left"
        onClose={() => setSidebarExpanded(false)}
      >
        <div className={styles.sidebarChildren}>
          <p>I am a basic sidebar 😃</p>
        </div>
        <Button
          ariaLabel="Close Sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(false)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}

export const WithTitle: Story<ComponentProps<typeof Sidebar>> = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setSidebarExpanded(true)}>
        Open sidebar with title
      </Button>
      <Sidebar
        title="Hello from the sidebar!"
        hideOverlay={false}
        open={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
      >
        <div className={styles.sidebarChildren}>
          <p>I am a sidebar. I have a title! 😃</p>
        </div>
        <Button
          ariaLabel="Close Sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(false)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}

export const WithOverlay: Story<ComponentProps<typeof Sidebar>> = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setSidebarExpanded(true)}>
        Open sidebar with overlay
      </Button>
      <Sidebar
        title="Sidebar With Title"
        open={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        hideOverlay={false}
      >
        <div className={styles.sidebarChildren}>
          <p>Sidebars can be cool</p>
          <p>I am a sidebar. I have a title! 😃</p>
          <TextInput name="test-input" label="Test Input" hideLabel={false} />
        </div>
        <Button
          ariaLabel="Close Sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(false)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}

export const NoOverlay: Story<ComponentProps<typeof Sidebar>> = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setSidebarExpanded(true)}>
        Open sidebar without overlay
      </Button>
      <Sidebar
        title="Sidebar With Title"
        open={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        hideOverlay={true}
      >
        <div className={styles.sidebarChildren}>
          <p>Sidebars can be cool</p>
          <p>I am a sidebar. I have a title! 😃</p>
          <TextInput name="test-input" label="Test Input" hideLabel={false} />
        </div>
        <Button
          ariaLabel="Close Sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(false)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}

export const LeftPosition: Story<ComponentProps<typeof Sidebar>> = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setSidebarExpanded(true)}>
        Open sidebar on the left
      </Button>
      <Sidebar
        title="Sidebar With Title"
        open={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        position="left"
      >
        <div className={styles.sidebarChildren}>
          <p>Sidebars can be cool</p>
          <p>I am a sidebar. I have a title! 😃</p>
          <TextInput name="test-input" label="Test Input" hideLabel={false} />
        </div>
        <Button
          ariaLabel="Close Sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(false)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}

export const RightPosition: Story<ComponentProps<typeof Sidebar>> = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <div>
      <Button ariaLabel="Open" onClick={() => setSidebarExpanded(true)}>
        Open sidebar on the right
      </Button>
      <Sidebar
        title="Sidebar With Title"
        open={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        position="right"
      >
        <div className={styles.sidebarChildren}>
          <p>Sidebars can be cool</p>
          <p>I am a sidebar. I have a title! 😃</p>
          <TextInput name="test-input" label="Test Input" hideLabel={false} />
        </div>
        <Button
          ariaLabel="Close Sidebar"
          aria-labelledby="close-sidebar"
          className="close-sidebar"
          onClick={() => setSidebarExpanded(false)}
        >
          Close
        </Button>
      </Sidebar>
    </div>
  )
}
