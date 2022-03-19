import React, { useContext } from "react";
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";


const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";


export const useBudgets = () => {
    return useContext(BudgetContext);
};

export const BudgetsProvider = ({ children }) => {
    const [ budgets, setBudgets ] = useLocalStorage("budgets", []);
    const [ expenses, setExpenses ] = useLocalStorage("expenses", []);

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId);
    };
    const addExpense = ({ description, amount, budgetId }) => {
        setExpenses(prevExpenses => {
            return [ ...prevExpenses, { id: uuidV4(), description, amount, budgetId } ];
        });
    };
    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) return prevBudgets;
            return [ ...prevBudgets, { id: uuidV4(), name, max } ];
        });
    };
    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.budgetId !== id));

    };
    const deleteBudget = ({ id }) => {
        setBudgets(prevBudgets => prevBudgets.filter(budget => budget.budgetId !== id));
    };


    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget
    }}>
        {children}
    </BudgetContext.Provider>;
}; 