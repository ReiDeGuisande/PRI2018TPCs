<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="id">
        <p style="font-weight: bold">
            <xsl:value-of select="."/>
        </p>
    </xsl:template>
    
    <xsl:template match="título">
        <h2>
            <xsl:value-of select="."/>
        </h2>
    </xsl:template>
    
    <xsl:template match="subtítulo">
        <h3>
            <xsl:value-of select="."/>
        </h3>
    </xsl:template>
    
    <xsl:template match="dinício">
        <p>
            Data de início: <xsl:value-of select="."/>
        </p>      
    </xsl:template>
    
    <xsl:template match="dfim">
        <p>
            Data de fim: <xsl:value-of select="."/>
        </p>     
    </xsl:template>
    
    <xsl:template match="supervisor">
        <p>
            <h4>
                Supervisionado por:
            </h4>
            <a href="{website}">
                <xsl:value-of select="nome"/>
            </a>
            <br/>
            <a href="mailto:{email}">
                Enviar correio
            </a>
        </p>   
    </xsl:template>
    
    <xsl:template match="elemento">
        <p>
            <h4>
                Realizado por:
            </h4>
            <p>
                <ul>
                    <xsl:value-of select="id"/>
                </ul>
                
            </p>
            <a href="{website}">
                <xsl:value-of select="nome"/>
            </a>
            <br/>
            <a href="mailto:{email}">
                Enviar correio
            </a>
        </p>   
    </xsl:template>
    
    <xsl:template match="resumo">
        <h4>
            Resumo
        </h4>
        <p>
            <xsl:apply-templates/>
        </p>     
    </xsl:template>
    
    <xsl:template match ="i">
        <i>
            <xsl:value-of select="."/>
        </i>
    </xsl:template>
    
    <xsl:template match ="b">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
    
    <xsl:template match="resultados">
        <h4>
            Resultados:
        </h4>
        <p>
            <xsl:apply-templates/>  
        </p>  
    </xsl:template>
    
    <xsl:template match="resultado">
        <p>
            <a href="{@path}">
                <xsl:value-of select="."/>
            </a>
        </p>
    </xsl:template>
    
</xsl:stylesheet>