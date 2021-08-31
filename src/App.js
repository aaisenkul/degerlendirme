import React, { useEffect, useState } from 'react';
import Header from './components/header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import QuestionPage from './components/question-page';
import Home from './components/home';
import FinalPage from './components/final';

const App = () => {

    const [columns, setColumns] = useState([]);
    const [isHeaderShown, setIsHeaderShown] = useState(false);
    const [setSelectedQuestionPage] = useState(-1);

    let sutun1Toplam = 0;
    let sutun2Toplam = 0;
    let sutun3Toplam = 0;
    let sutun4Toplam = 0;

    useEffect(() => {
        if (window.location.pathname.search('question') !== -1) {
            setIsHeaderShown(true);
        } else {
            setIsHeaderShown(false)
        }
        localStorage.setItem("username","");
    }, [])

    for (let i = 0; i < columns.length; i++) {
        sutun1Toplam = sutun1Toplam + columns[i].values[1];
        sutun2Toplam = sutun2Toplam + columns[i].values[2];
        sutun3Toplam = sutun3Toplam + columns[i].values[3];
        sutun4Toplam = sutun4Toplam + columns[i].values[4];
    }
    



    const setSelectedPage = i => {
        setSelectedQuestionPage(i);
    }

    const pushToColumns = answer => {
        setColumns([...columns, answer]);
    }
    return (
        <div className={'app'.concat(window.location.pathname === '/' ? ' center' : '')}>
            
            <BrowserRouter>
                {isHeaderShown && <Header setSelectedPage={setSelectedPage} />}
                <Switch>
                    <Route exact component={Home} path="/" />
                    <Route component={(props) => <QuestionPage {...props} columns={columns} pushToColumns={(answer) => pushToColumns(answer)} setIsHeaderShown={setIsHeaderShown} />} path="/question/:number" />
                    <Route exact path="/final" component={(...props) => <FinalPage {...props} columnOne={sutun1Toplam} columnTwo={sutun2Toplam} columnThree={sutun3Toplam} columnFour={sutun4Toplam} setIsHeaderShown={setIsHeaderShown} />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;