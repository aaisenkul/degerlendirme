import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import data from '../data.json';
import Swal from 'sweetalert2'

const QuestionPage = ({ match, setIsHeaderShown, pushToColumns, columns }) => {
    // eslint-disable-next-line
    const [error, setError] = useState('');
    // eslint-disable-next-line
    const [changeColor,setChangeColor] = useState(false);
    const id = match.params.number;
    const [D, setD] = useState(0);
    const [DD, setDD] = useState(0);
    const [DDD, setDDD] = useState(0);
    const [DDDD, setDDDD] = useState(0);

    

  
        

    useEffect(() => {

        const selectedProps = columns.filter(x => x.id === id);
        if(selectedProps.length > 0){
            setD(selectedProps[0].values[1]);
            setDD(selectedProps[0].values[2]);
            setDDD(selectedProps[0].values[3]);
            setDDDD(selectedProps[0].values[4]);
        }

        setIsHeaderShown(true);
    }, [setIsHeaderShown, pushToColumns, columns, id])

    useEffect(()=> {
        if(D&&DD&&DDD&&DDDD){
            setChangeColor()
        }
    },[D,DD,DDD,DDDD])

    const sendAnswerHandler = () => {
        if (D && DD && DDD && DDDD) {
            const temp = [D, DD, DDD, DDDD];
            const unq = (value, index, self) => {
                return self.indexOf(value) === index;
            }
            var _tempUnqArr = temp.filter(unq);
            if (_tempUnqArr.length === 4) {
                pushToColumns({
                    id: id,
                    values: {
                        1: Number(D),
                        2: Number(DD),
                        3: Number(DDD),
                        4: Number(DDDD),
                    }
                });
            } else {
                Swal.fire('Hata', 'Birkaç seçim birbiri ile aynı. Her seçenek birbirinden farklı olmalı.', 'error')
            }
        } else {
            Swal.fire("Hata", "Lütfen her seçenek için 1-4 arasında seçin yapın ve her seçim birbirinden farklı olsun.", "error");
            return;
        }
    }

    const canRoute = () => {
        if (D && DD && DDD && DDDD) {
            const temp = [D, DD, DDD, DDDD];
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }
            var unique = temp.filter(onlyUnique);
            if (unique.length === 4) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <div className={'question-page'}>
            <h2 className="header">{data.pages[Number(id) -1].mainQuestion}</h2>
            <span className={'explanation'}>Seçenekleri 1-4 arasında oyladıktan sonra, sonraki soruya geçiniz. Her seçenek birbirinden farklı olmalıdır.</span>
            <div className={'sorular'}>
                {
                    data.pages[id - 1].questions.map((q, i) => {
                        return (
                            <div key={i} className="soru" >
                                <span>{q.q}</span>
                                <select
                                    className="soru"
                                    value={
                                        q.id === 1 ? D
                                            : q.id === 2 ? DD
                                                : q.id === 3 ? DDD
                                                    : q.id === 4 ? DDDD : -1
                                    }
                                    onChange={
                                        q.id === 1 ? e => setD(e.target.value)
                                            : q.id === 2 ? e => setDD(e.target.value)
                                                : q.id === 3 ? e => setDDD(e.target.value)
                                                    : q.id === 4 ? e => setDDDD(e.target.value)
                                                        : null
                                    }
                                >
                                    <option value={-1}>Seç</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </select>


                            </div>
                        )
                    })
                }
                <div>
                    {error ? error : ''}
                </div>
            </div>
            <div className={'buttons'}>
                <NavLink to={(id > 1 && id <= 14 ? `/question/${Number(id) - 1}` : '/home')}>Önceki soru</NavLink>
                <NavLink onClick={sendAnswerHandler} to={canRoute() ? (id <= 13 ? `/question/${Number(id) + 1}` : '/final') : '/question/' + id}>Sonraki soru</NavLink>
            </div>
        </div>
    );
}

export default QuestionPage;