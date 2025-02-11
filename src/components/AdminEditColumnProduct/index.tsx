import { useForm } from "react-hook-form";

import styles from './styles.module.scss'
import { useEditProductMutation } from '../../redux/apiSlice';
import { useNavigate } from "react-router";
type FormInput = {
    title: string,
    price: number,
    imageUrl: string,
    category: string,
    size: number,
    unit: string,
    type: string,
    inStock: number


}
interface EditColumnProps {
        id: number;
        title: string;
        price: number;
        imageUrl: string;
        category: string;
        size: number;
        unit: string;
        type: string;
        inStock: number;
}
export const AdminEditColumnProduct: React.FC<EditColumnProps> = ({ id, title, price, imageUrl, category, size, unit, type, inStock }) => {
    const navigate = useNavigate();
    const [editProduct] = useEditProductMutation();
    const {
        register,
        handleSubmit,
    } = useForm<FormInput>({
        defaultValues: {
            title: title,
            price: price,
            imageUrl: imageUrl,
            category: category,
            size: size,
            unit: unit,
            type: type,
            inStock: inStock
        }
    });
    const onClickEdit = (data: FormInput) => {
        try {
            editProduct({
            id: id,
            title: data.title,
            price: Number(data.price),
            imageUrl: data.imageUrl,
            category: data.category,
            size: Number(data.size),
            unit: data.unit,
            type: data.type,
            inStock: Number(data.inStock)
        }).unwrap();
        navigate('/adminEditProduct')
        // console.log('Data: ', {
        //     id,
        //     ...data
        // });
    }catch(error) {
        console.log(error);
    }
    }
    return (
        <form onSubmit={handleSubmit(onClickEdit)}>
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
                type="number" 
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
                type="number" 
                placeholder='Количество'/> 

            </div>
            <button className={styles.addBtn}>Применить изменения</button>
        </div>
            </form>
    );
}