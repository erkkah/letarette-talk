import { FunctionalComponent as FC, h } from "preact";

interface HeaderProps {
    headline: string;
    tagline: string;
}

const Header: FC<HeaderProps> = (props) => {
    return (
        <header>
            <span><h1><a class="headline" href="/">{props.headline}</a></h1></span>
            <span class="tagline">{props.tagline}</span>
        </header>
    );
};

export default Header;
