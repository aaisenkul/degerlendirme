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
    const [Q1, setQ1] = useState(0);
    const [Q2, setQ2] = useState(0);
    const [Q3, setQ3] = useState(0);
    const [Q4, setQ4] = useState(0);

    

  
        

    useEffect(() => {

        const selectedProps = columns.filter(x => x.id === id);
        if(selectedProps.length > 0){
            setQ1(selectedProps[0].values[1]);
            setQ2(selectedProps[0].values[2]);
            setQ3(selectedProps[0].values[3]);
            setQ4(selectedProps[0].values[4]);
        }

        setIsHeaderShown(true);
    }, [setIsHeaderShown, pushToColumns, columns, id])

    useEffect(()=> {
        if(Q1&&Q2&&Q3&&Q4){
            setChangeColor()
        }
    },[Q1,Q2,Q3,Q4])

    const sendAnswerHandler = () => {
        if (Q1 && Q2 && Q3 && Q4) {
            const temp = [Q1, Q2, Q3, Q4];
            const unq = (value, index, self) => {
                return self.indexOf(value) === index;
            }
            var _tempUnqArr = temp.filter(unq);
            if (_tempUnqArr.length === 4) {
                pushToColumns({
                    id: id,
                    values: {
                        1: Number(Q1),
                        2: Number(Q2),
                        3: Number(Q3),
                        4: Number(Q4),
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
        if (Q1 && Q2 && Q3 && Q4) {
            const temp = [Q1, Q2, Q3, Q4];
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
                                        q.id === 1 ? Q1
                                            : q.id === 2 ? Q2
                                                : q.id === 3 ? Q3
                                                    : q.id === 4 ? Q4 : -1
                                    }
                                    onChange={
                                        q.id === 1 ? e => setQ1(e.target.value)
                                            : q.id === 2 ? e => setQ2(e.target.value)
                                                : q.id === 3 ? e => setQ3(e.target.value)
                                                    : q.id === 4 ? e => setQ4(e.target.value)
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