import React from 'react';
import debounce from 'lodash/debounce';
import { useAppDispatch } from '../../redux/hooks';
import styles from './styles.module.scss';
import { setSearch } from '../../redux/filter/slice';
export const Search = () => {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    
    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInputValue(event.target.value.toLocaleLowerCase());
        setValue(event?.target.value);
    };
    

    const onChangeInputValue = React.useCallback( 
       debounce((str: string) => {
        dispatch(setSearch(str));
       }, 1000), 
       [],
    );
    const onClickClearValue = () => {
        dispatch(setSearch(''))
        setValue('');   
        inputRef?.current?.focus();
    }

    return (
        <div className={styles.search} >
            <input className={styles.searchInput} ref={inputRef} type="text" placeholder="Поиск..." value={value} onChange={(event) => onChangeValue(event)}>
            </input>
            <img className={styles.clearItemImg} src="/img/cross.svg" alt="cross" width={11} height={11} onClick={() => onClickClearValue()}/>
        </div>
    );
};


