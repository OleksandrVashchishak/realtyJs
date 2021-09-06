import React from 'react'
import { useDispatch } from 'react-redux';
import { addPlan } from '../../redux/actions/plans';
import { useCookies } from 'react-cookie';
const RenderSavePlan = ({ refTable, planName }) => {
    const [cookies] = useCookies();
    const [clonePlan, setClonePlan] = React.useState()
    const dispatch = useDispatch();
    const getPlan = () => {
        if (!planName.trim()) {
            setTimeout(() => alert(`Ви не дали імені своєму шаблону`), 1)
            return
        }
        setClonePlan({ __html: refTable.current.innerHTML })
        setTimeout(() => alert(`Ваш шаблон ${planName} збережений у вашому особистому кабінеті`), 1)
        dispatch(addPlan({
            name: planName.trim(),
            userId: cookies.currentUser.id,
            plan: { __html: refTable.current.innerHTML },
        }));
    }

    return (
        <>
            <div className="save-plan-df">
                <button className="save-plan" onClick={() => getPlan()}>Зберегти план</button>
                {clonePlan && <span> Свої шаблони ви можете переглянути у вкладці <a href="/">шаблони</a>  </span>}
            </div>

            <span className='plan-name-save'>{clonePlan && planName}</span>
            <div className='save-plan-wrapper' dangerouslySetInnerHTML={clonePlan} ></div>
        </>
    )
}

export default RenderSavePlan