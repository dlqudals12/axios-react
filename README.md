## 1. axios

- axios는 서버에 요청을 보내고 서버로부터 응답이 오면 제대로 응답이 왔을 때와 못 왔을 때를 구분하여 처리한다. 서버에 요청얼 보내을 때 응답이 오기까지 시간이 걸리브로 서버에 보내는 요청은 비동기 처리를 해주며, 그 이후에 응답을 바탕으로 처리하는 과정은 .then이나 await를 이용한다.

- -정석적인 axios방식
- ex)

```

<br>
 axios({ <br>
  method: "get' <br>
  url: "url", <br>
  responseType: "type" <br>
}).then(function response) { <br>
  //response Action <br>
}); <br>

code1 get
code2 async function getDate() { <br>
  try { <br>
	const response = await axios.get('url주소'); <br>
	console.log(response);     <br> 
  } catch (error) {             <br>
	console.error(error);       <br>
  }
}

## 2 jotai

- jotai: React의 상태관리 라이브러리 중 하나이다.
- 공식문서: https://jotai.org/docs/introduction
- jotai의 atom은 상태 조각으로 아주 작은 단위의 상태를 의미한다. 상태를 생성하기 위해서는 atom을 이용하여 초기 상태를 생성하게 된다.
- ex) import {atom} from 'jotai'
- 
- const countAtom = atom(0)
- const countryAtom = atom('japan')
- const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])
- const manAtom = atom({'Dragom Ball' : 1984, 'One pice: 1997})

- jotai의 상태변화를 시키기 위해서는 useAtom을 사용한다. 사용 방식이 useState와 거의 비슷하다.

- ex) import { useAtom } from 'jotai'
- 
- function Counter() {
- 	const [count, setCount] = useAtom(countAtom)
- 	return {
- 		<h1>
- 		  {count}
- 		  <button onClick={() => setCount(c => c+1)}>one up</button>
- 		</h1>
- 	}
- }

- jotai에는 세 가지 패턴이 있다
	- 읽기전용 atom
	- 쓰기전용 atom
	- 읽기-쓰기 atom
- ex) 
- const readOnlyAtom = atom((get) => get(priceAtom) * 2)
- 
- const writeOnlyAtom = atom(
-   null,  	//첫 번째 인수에 'null'을 전달하는 규칙이다.
-   (get, set, update) => {
- 	//update는 atom을 업데이트하기 위해 받아오는 값입니다.
- 	set(priceAtom, get(priceAtom) - update.diacount)
-   }
- }
- 
- const reatWriteAtom = atom(
-   (get) => get(priceAtom) * 2,
-   (get, set, newPrice) => {
- 	set(priceAtom, newPrice / 2)
-   // 동시에 원하는 만큼 atom을 설정할 수 있습니다.
-   }
- }
- 
- jotai utils
- selectAtom: atom안에서 데이터가 객체로 이루어져 있으면 따로 나누어서 관리하는 방식
- ex)
- const defaultPerson = {
-   name: {
- 	first: 'Jane',
- 	last: 'Doe'
- },
-   birth: {
- 	year: 2000,
- 	month: 'Jan',
- 	day: 1,
- 	time: {
- 	  hour: 1,
- 	  minute: 1
- 	}
-   }
- }
- //오리지널 atom
- const personAtom = atom(defaultPerson)
- //person.name을 추적한다. person.name 객체가 변경되면 업데이트된다.
- const nameAtom = selectAtom(personAtom, (person) => person.name)
- //person.boarn을 추적합니다.
- //deepEquals 옵션은 birth 객체가 같은 데이터 값을 가진 새로운 객체로 변경될 경우, 업데이트를 하지 않음을 의미한다.
- const birthAtom = selectAtom(personAtom, (person) => person.birth, deepEquals)
- 
- atomWithReset, useRestAtom: 상태를 초기화 해야하는 경우 매번 initialstate를 넣어주기 귀찮은 경우가 많은데 atomWithReset과 userResetAtom을 사용할 경우 매우 편리하게 상태를 초기화 할 수 있다
- 
- ex)
- import { atomWithReset } from 'jotai/utils'
- 
- const dollarsAtom = atomWithReset(0)
- const todoListAtom = atomWithReset([{ description: 'Add a todo', checked: false }])
- 
- import { useResetAtom } from 'jotai/utils'
- import { todoListAtom} from './store'
- 
- const TodoResetButton = () => {
 -  const resetTodoList = useRestAtom(todoListAtom)
-   return <button onClick={resetTodoList}>Reset</button>
- }
- 
- useUpdateAtom. useAtomValue: atom의 값만 가져오거나 변경하는 함수만을 가져올 수 있다.
- ex)
- import { atom, Provider, useAtom} from 'jotai'
- import { useAtomValue } from 'jotai/utils'
- 
- const countAtom = atom(0)
- 
- const  Counter = () => {
- const setCount - useUpdateAtom(countAtom)
-   const count = useAtomValue(countAtom)
-   return (
- 	<>
- 	  <div>count: {count}</div>
- 	  <button onClick={() => setCount(count +1)}>+1</button>
-	</>
-  )
- }
- 
- 3. Async / Await
- 
- Async / await이란?
- Promise를 통해서 어떻게 비동기 처리를 하는 방법도 있지만, Promise의 단점을 해결하기 위해 ES7에서 async/await가 추가되었다. async/await 키워드를 사용하면 비동기 코드를 마치 동기 코드처럼 작성할 수 있다. callback이나 prmise와 같이 비동기 코드를 작성하는 새로운 방법이다.
- 
- Promise ex)
- const users = () => {
- 	getDate()
- 		.then(users => {
- 		console.log(users);
- 		return users;
- 		})
- 		.catch(error => {
- 			console.log(error);
- 		});
- }
- 
- Async/Await를 이용한 비동기요청 처리 방법
- const users = async() => {
- 	console.log(await getData());
- 	return await getData();
- }
