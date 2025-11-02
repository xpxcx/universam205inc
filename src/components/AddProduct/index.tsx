import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { useAddProductMutation } from '../../redux/apiSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
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
    const [addProduct, { isLoading }] = useAddProductMutation();


    const {
        register,
        handleSubmit,
        // formState: {
        //     errors
        // },
        reset,
        // clearErrors

    } = useForm<FormInput>();

    const onClickAddBtn = async (data: FormInput) => {
        try {
            await addProduct(data);
            reset();
        }catch(error) {
            console.log(error);
        }
    
    }
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
                {isLoading 
                ? 
                    <Flex align="center" gap="middle">
                        <Spin indicator={<LoadingOutlined spin />} size="large"  className={styles.spinner}/>
                    </Flex> 
                :  
                    <button className={styles.addBtn}>Добавить</button>
                }
            </div>
        

        </form>
    );
}