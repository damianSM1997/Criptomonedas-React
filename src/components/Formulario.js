import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomonda}) => {

    //state del listado de criptomonedas

    const [listaCripto, guadarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const monedas = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'COD', nombre: 'Peso Colombiano'}
    ]

    //utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', monedas);
    //utilizar useCriptomoneda

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);

    //ejecutar el llamado a la api
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            

            const resultado = await axios.get(url);

            guadarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //cuando el usuario hace submit

    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos

        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }        

        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda)
        guardarCriptomonda(criptomoneda);

        
    }
    return ( 

        <form
            onSubmit={cotizarMoneda}
        >
            
        {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
        <SelectMoneda />
        <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>

     );
}
 
export default Formulario;