import { Button, Pane, Text, TextInput, Card, Strong, TextInputField, toaster, Spinner, Combobox, FormField, Table, SideSheet, Heading } from 'evergreen-ui';

export default function userPanel(){
  return (
    <SideSheet isShown={true}  preventBodyScrolling containerProps={{display: 'flex', flex: '1', flexDirection: 'column'}}>
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading size={600}>Menu</Heading>
        </Pane>
      </Pane>
      <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
        <Card backgroundColor="white" elevation={0} height='auto' width='auto'>

        </Card>
      </Pane>
    </SideSheet>
  )
};
