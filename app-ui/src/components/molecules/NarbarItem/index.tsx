import * as Styled from "./style"

interface ItemProps {
    name: string;
    icon: any;
    link: string;
}
const NarbarItem = ({name, icon, link}: ItemProps) => {
    return <Styled.Container>
        <Styled.Link href={link}>
            <Styled.Icon>{icon}</Styled.Icon>
            <Styled.Text>{name}</Styled.Text>
        </Styled.Link>
    </Styled.Container>
}

export default NarbarItem;