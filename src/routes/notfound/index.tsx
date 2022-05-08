import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Notfound: FunctionalComponent = () => {
    return (
        <div class={style.notfound}>
            <h1>Gone!</h1>
            <p>On a clean drive, you can search forever</p>
            <Link href="/">
                <h4>Try Again</h4>
            </Link>
        </div>
    );
};

export default Notfound;
