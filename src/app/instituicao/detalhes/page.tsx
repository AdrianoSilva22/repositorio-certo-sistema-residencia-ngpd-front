"use client"

import { EmailInput } from '@/components/emailInput'
import { Input } from '@/components/stringInput'
import { Institution, initialvalueInstitution } from '@/models/institution'
import { mensagemErro, mensagemSucesso } from '@/models/toastr'
import { InstituitionServices } from '@/service/institution'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import SideBar from '../../../components/Sidebar/SideBar'

export default function InstitutionUpdate() {
    const [institution, setInstitution] = useState<Institution>(initialvalueInstitution)
    const { updateEntity, getEntityById } = InstituitionServices

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchInstitutionById = async () => {
            try {
                const institutionId = searchParams.get('Id') as string;
                const resultfetchInstitutionById = await getEntityById(institutionId);
                setInstitution(resultfetchInstitutionById.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInstitutionById();
    }, [searchParams]);


    return (
        <>
            <Header />
            <SideBar />
            {institution ? (

                <div className="main-wrapper">
                    <div className="page-wrapper">
                        <div className="content container-fluid">
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span className="page-title">Visualizar Instituição </span>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="/instituicao">Listagem de Instituições</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h5 className="form-title">
                                                            <span>Visualizar Instituição</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
    <div className="form-group local-forms">
        <label>
            Nome da Instituição <span className="login-danger">*</span>
        </label>
        <Input
            value={institution.name}
            readOnly
            onChange={(value: string) => setInstitution({ ...institution, name: value })} 
        />
    </div>
</div>
<div className="col-12 col-sm-4">
    <div className="form-group local-forms">
        <label>
            Email da Instituição <span className="login-danger">*</span>
        </label>
        <EmailInput 
            value={institution.contact}
            readOnly
            onChange={(value: string) => setInstitution({ ...institution, contact: value })}
        />
    </div>
</div>
                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div>Carregando...</div>)}
        </>
    )
}