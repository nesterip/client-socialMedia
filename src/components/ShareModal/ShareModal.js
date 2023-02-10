import { Modal,useMantineTheme} from '@mantine/core';
import PostShare from '../PostShare/PostShare';

//Ventana modal usando la libreria "mantine"
function ShareModal({modalOpened, setModelOpened}) {
    
    //tema de la Ventana modal de mantine
    const theme = useMantineTheme();

    return (
    <>
        <Modal opened={modalOpened}
            onClose={() => setModelOpened(false)}
            overlayColor={theme.colorScheme ==='dark' ? theme.color[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="50%"
        >
            <PostShare/>
        </Modal>
    </>
    );
}

export default ShareModal;