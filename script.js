function main()
{
    let userName=prompt('Enter Your Name.. ');
    if(userName)
    {
        document.querySelector('.uname').innerText=`${userName}`;
        n1=0;
        n2=0;
        flag=false;
        flag1=false;
        mode_=0;
        async function getQuiz(mode,flag1)
        {
            document.querySelector('.finish').style.display='none';
            document.querySelector('.next').style.display='none';
            document.querySelector('.submit').style.display='block';
            document.querySelector('.box1').style.display='none';
            document.querySelector('.box2').style.display='none';
            document.querySelector('.lds-grid').style.display='inline-block';
            if(flag1)
            {
                var url=`https://opentdb.com/api.php?amount=1&category=${mode}`;
            }
            else
            {
                var url=`https://opentdb.com/api.php?amount=1`;
            }
            var response=await fetch(url);
            var data=await response.json();
            let arr=[];
            arr.push(data.results[0].correct_answer);
            document.getElementById('hid').value=data.results[0].correct_answer;
            arr=arr.concat(data.results[0].incorrect_answers);
            function shuffle(array) {
                var currentIndex = array.length,  randomIndex;
            
                // While there remain elements to shuffle...
                while (currentIndex != 0) {
            
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
            
                    // And swap it with the current element.
                    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
                }
            
                return array;
            }
            var str1="";
            for(i of shuffle(arr))
            {
                str1+=`<div class="op1">
                    <div class="pt"></div>
                    <h5>${i}</h5>
                </div>`;
            }
            document.querySelector('.box1').style.display='block';
            document.querySelector('.lds-grid').style.display='none';
            document.querySelector('.opt').innerHTML=str1;
            document.querySelector('.ques').innerHTML=`<h4>Q. ${data.results[0].question}</h4>`;
            flag=true;
        
            let b1=document.querySelectorAll('.op1');
            for(i of b1)
            {
                i.addEventListener('click',(e)=>{
                    if(document.querySelector('.active')!=undefined)
                    {
                        document.querySelector('.active').classList.remove('active');
                        document.querySelector('.active-pt').classList.remove('active-pt');
                    }
                    if(e.target.tagName=='DIV')
                    {
                        if(!e.target.classList.contains('pt'))
                        {
                            e.target.classList.add('active');
                            e.target.children[0].classList.add('active-pt');
                        }
                        else
                        {
                            e.target.parentNode.classList.add('active');
                            e.target.classList.add('active-pt');
                        }
                    }
                    else
                    {
                        e.target.parentNode.classList.add('active');
                        e.target.previousElementSibling.classList.add('active-pt');
                    }
                })
            }
        }
        getQuiz(mode_,flag1);
        
        document.querySelector('.submit').addEventListener('click',()=>{
            flag=false;
            if(document.querySelector('.active')!=undefined)
            {
                n2++;
                let c1=document.getElementById('hid').value;
                let c2=document.querySelector('.active').children[1].innerText;
                if(c1==c2)
                {
                    document.querySelector('.active').classList.add('true');
                    n1++;
                }
                else
                {
                    let b2=document.querySelectorAll('.op1');
                    for(i of b2)
                    {
                        if(i.children[1].innerText==c1)
                        {
                            i.classList.add('true');
                            break;
                        }
                    }
                    document.querySelector('.active').classList.add('false');
                }
                document.querySelector('.finish').style.display='block';
                document.querySelector('.next').style.display='block';
                document.querySelector('.submit').style.display='none';
                document.querySelector('.score').innerHTML=`<p>${n1}/${n2}</p>`;
            }
            else
            {
                document.querySelector('.alert').style.display='block';
            }
        })
        document.querySelector('.next').addEventListener('click',()=>{
            document.querySelector('.box1').style.display='none';
            document.querySelector('.lds-grid').style.display='inline-block';
            getQuiz(mode_,flag1);
        
        })
        document.querySelector('.finish').addEventListener('click',()=>{
            flag=false;
            document.querySelector('.box1').style.display='none';
            document.querySelector('.box2').style.display='block';
            document.getElementById('fsc').innerText=`${n1}/${n2}`;
        
        })
        document.querySelector('.play').addEventListener('click',()=>{
            document.querySelector('.box1').style.display='none';
            document.querySelector('.lds-grid').style.display='inline-block';
            n1=0;
            n2=0;
            getQuiz(mode_,flag1);
        })
        document.querySelector('.alert').addEventListener('click',()=>{
            document.querySelector('.alert').style.display='none';
        })
        let b30=document.querySelectorAll('.mode');
        for(i of b30)
        {
            i.addEventListener('click',(e)=>{
                ids=e.target.id;
                ids1=document.querySelector('.mode_active').id;
                document.querySelector('.mode_active').classList.remove(`md${ids1}${ids1}`);
                document.querySelector('.mode_active').classList.remove(`mode_active`);
                e.target.classList.add('mode_active');
                e.target.classList.add(`md${ids}${ids}`);
                if(ids==1)
                {
                    flag1=true;
                    mode_=9;
                    getQuiz(mode_,flag1);
                }
                if(ids==2)
                {
                    flag1=true;
                    mode_=21;
                    getQuiz(mode_,flag1);
                }
                if(ids==3)
                {
                    flag1=true;
                    mode_=23;
                    getQuiz(mode_,flag1);
                }
                if(ids==4)
                {
                    flag1=true;
                    mode_=24;
                    getQuiz(mode_,flag1);
                }
                if(ids==5)
                {
                    flag1=true;
                    mode_=25;
                    getQuiz(mode_,flag1);
                }
                if(ids==6)
                {
                    flag1=true;
                    mode_=18;
                    getQuiz(mode_,flag1);
                }
                if(ids==7)
                {
                    flag1=true;
                    mode_=19;
                    getQuiz(mode_,flag1);
                }
                if(ids==8)
                {
                    flag1=false;
                    mode_=0;
                    getQuiz(mode_,flag1);
                }
            })
        }
    }
    else
    {
        alert('Enter Your Name To Continue! ');
        main();
    }
}
main();