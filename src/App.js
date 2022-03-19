import Container from 'react-bootstrap/Container';
import { Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import { useState } from 'react';
import { useBudgets } from './contexts/BudgetContext';
function App() {

  const [ showAddBudgetModal, setShowAddBudgetModal ] = useState(false);
  const [ showAddExpenseModal, setShowAddExpenseModal ] = useState(false);
  const [ addExpenseModalBudgetId, setAddExpenseModalBudgetId ] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap="2" className="mb-4">
          <h1 className='me-auto'>Budgets</h1>
          <Button onClick={() => setShowAddBudgetModal(true)} variant='primary'>Add Budget</Button>
          <Button onClick={openAddExpenseModal} variant='outline-primary'>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start "
        }}></div>
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense, 0);
          return (<BudgetCard
            name={budget.name}
            amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          ></BudgetCard>);
        }

        )}
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId} />
    </>
  );
}

export default App;
