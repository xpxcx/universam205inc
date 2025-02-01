import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { useAddProductMutation } from '../../redux/adminApiSlice';
type FormInput = {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    category: string,
    size: number,
    unit: string,
    type: string,
    inStock: number
}

export const AddProduct = () => {
    const [addProduct] = useAddProductMutation();

const onClickAddBtn = async (data: FormInput) => {
    try {
        await addProduct(data);
    }catch(error) {
        console.log(error);
    }

}
    const {
        register,
        handleSubmit,
        // formState: {
        //     errors
        // },
        // reset,
        // clearErrors

    } = useForm<FormInput>();

    return (
        <form onSubmit={handleSubmit(onClickAddBtn)}>
            <div className={styles.containerAdmin}>
                <div className={styles.inputBlock}>
                    <input 
                    {...register('title', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Название товара'/>
                     <input 
                    {...register('price', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Стоимость'/> 

                    <input 
                    {...register('imageUrl', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Картинка (Ссылка)'/> 
                    
                    <input 
                    {...register('category', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Категория'/> 
                    
                    <input 
                    {...register('size', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Размер (Цифры)'/> 
                    
                    <input 
                    {...register('unit', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Единицы измерения'/> 
                    
                    <input 
                    {...register('type', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Тип товара (Еда/Напиток)'/> 
                    <input 
                    {...register('inStock', 
                        { 
                            required: 'Это обязательно поле'
                        }
                    )}
                    type="text" 
                    placeholder='Количество'/> 

                </div>
                <button className={styles.addBtn}>Добавить</button>
            </div>
        

        </form>
    );
}